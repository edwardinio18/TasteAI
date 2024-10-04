FROM oven/bun:1.1.8

WORKDIR /usr/local/app

COPY . .

RUN chmod +x boot_react.sh

EXPOSE 3000

CMD ["sh", "boot_react.sh"]