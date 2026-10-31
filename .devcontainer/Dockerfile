FROM node:22.17.1-bookworm

ARG USERNAME=node

# System deps: git, zsh, sudo, iptables/ipset for firewall, chromium for selenium tests
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    ca-certificates \
    gnupg \
    zsh \
    sudo \
    iptables \
    ipset \
    iproute2 \
    dnsutils \
    less \
    man-db \
    procps \
    fzf \
    jq \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_BIN=/usr/bin/chromedriver
# System chromium-driver above already provides the binary the npm
# `chromedriver` package would otherwise fetch from Google's CDN at install
# time — skip that download so init-firewall's allowlist stays small.
ENV CHROMEDRIVER_SKIP_DOWNLOAD=true

# node user (uid 1000) ships with the base image already; grant passwordless sudo
# so postCreate/firewall scripts can run as root when needed.
RUN echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

RUN mkdir -p /workspace && chown -R $USERNAME:$USERNAME /workspace

COPY init-firewall.sh /usr/local/bin/init-firewall.sh
RUN chmod +x /usr/local/bin/init-firewall.sh \
    && echo "$USERNAME ALL=(root) NOPASSWD:/usr/local/bin/init-firewall.sh" >> /etc/sudoers.d/$USERNAME

USER $USERNAME
WORKDIR /workspace

CMD ["sleep", "infinity"]
