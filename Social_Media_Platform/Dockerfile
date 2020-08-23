FROM mongo:latest
LABEL "about"="Installs everything to get the platform up and running"
LABEL "gh-link"="https://github.com/axenhammer/CODAR"
LABEL "author"="Team Axenhammer"

ENV LANG C.UTF-8

# extra dependencies (over what buildpack-deps already includes)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libbluetooth-dev \
    tk-dev \
    uuid-dev
RUN apt-get update && apt-get install -y --no-install-recommends \ 
    git \
    nano \
    python3.6 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/
RUN git clone https://github.com/axenhammer/CODAR.git
RUN pip3 install -r "CODAR/Social_Media_Platform/requirements.txt"

# Default port to execute the entrypoint (MongoDB)
CMD ["--port 27017"]
# Set default container command
ENTRYPOINT usr/bin/mongod

# Start the server
# CMD ["CODAR/Social_Media_Platform/app.py"]
# ENTRYPOINT ["python3"]
# ENTRYPOINT ["/bin/bash"]
EXPOSE 27017
EXPOSE 3000/tcp
