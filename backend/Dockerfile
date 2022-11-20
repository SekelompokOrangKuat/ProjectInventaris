FROM ruby:2.6.10

WORKDIR /backend

COPY Gemfile* /backend/
RUN gem install bundler:2.3.26
RUN bundle install

COPY . /backend/

CMD ["rails", "server", "-b", "0.0.0.0"]