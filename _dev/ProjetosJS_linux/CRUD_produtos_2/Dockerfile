FROM node 
RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app

ADD package.json ${HOME}/
RUN chown -R app:app ${HOME}/*

USER app
WORKDIR ${HOME}
RUN npm install

ADD . ${HOME}/

CMD ["npm","start"]