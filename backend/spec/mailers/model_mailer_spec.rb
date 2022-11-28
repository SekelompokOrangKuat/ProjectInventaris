require "rails_helper"

RSpec.describe ModelMailer, type: :mailer do
  describe "lupapassword_notification" do
    let(:mail) { ModelMailer.lupapassword_notification }

    it "renders the headers" do
      expect(mail.subject).to eq("Lupapassword notification")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end