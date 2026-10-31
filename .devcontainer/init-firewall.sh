#!/usr/bin/env bash
# Restrict container egress to the hosts Claude Code / npm / git actually need.
# Runs as root (via sudo) at container start. Safe to re-run.
set -euo pipefail
IFS=$'\n\t'

echo "[init-firewall] flushing existing rules"
iptables -F
iptables -X
iptables -t nat -F 2>/dev/null || true
ipset destroy allowed-domains 2>/dev/null || true

ipset create allowed-domains hash:net

resolve_and_add() {
    local domain="$1"
    local ips
    ips=$(getent ahosts "$domain" | awk '{print $1}' | sort -u) || true
    for ip in $ips; do
        ipset add allowed-domains "$ip" 2>/dev/null || true
    done
}

ALLOWED_DOMAINS=(
    api.anthropic.com
    console.anthropic.com
    statsig.anthropic.com
    sentry.io
    registry.npmjs.org
    github.com
    raw.githubusercontent.com
    objects.githubusercontent.com
    codeload.github.com
    api.github.com
    deb.debian.org
    security.debian.org
    api.web3forms.com
    www.google-analytics.com
    region1.google-analytics.com
)

for domain in "${ALLOWED_DOMAINS[@]}"; do
    resolve_and_add "$domain"
done

# Default policy: drop outbound, allow loopback/DNS/established, allow allowed-domains
iptables -P OUTPUT DROP
iptables -P INPUT DROP
iptables -P FORWARD DROP

iptables -A OUTPUT -o lo -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT

iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --sport 53 -j ACCEPT
iptables -A INPUT -p tcp --sport 53 -j ACCEPT

iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Local docker network (devcontainer host, port forwarding for vite dev server)
iptables -A OUTPUT -d 172.16.0.0/12 -j ACCEPT
iptables -A INPUT -s 172.16.0.0/12 -j ACCEPT

iptables -A OUTPUT -m set --match-set allowed-domains dst -j ACCEPT

echo "[init-firewall] done. Verifying..."
if curl -s --max-time 3 https://api.anthropic.com >/dev/null 2>&1; then
    echo "[init-firewall] OK: api.anthropic.com reachable"
else
    echo "[init-firewall] WARN: api.anthropic.com not reachable (check DNS/ipset)"
fi
if curl -s --max-time 3 https://example.com >/dev/null 2>&1; then
    echo "[init-firewall] FAIL: unexpected domain reachable, firewall not restricting"
    exit 1
else
    echo "[init-firewall] OK: unlisted domains blocked"
fi
