class Notification < ActiveRecord::Base
  validates :to_user, presence: true

  belongs_to :sender, class_name: "User", foreign_key: :to_user
  belongs_to :receiver, class_name: "User", foreign_key: :from_user
end
