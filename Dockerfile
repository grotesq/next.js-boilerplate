FROM centos

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install nodejs make gcc* -y
