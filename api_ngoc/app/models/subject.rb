class Subject < ActiveRecord::Base
  before_save :set_title_id

  validates_uniqueness_of :title_id
  validates :project, presence: true

  has_many :posts
  belongs_to :project
  belongs_to :parent_subject, foreign_key: :subject_id
  has_many :subjects
  belongs_to :created_user, foreign_key: :created_by
  belongs_to :updated_user, foreign_key: :updated_by

  include Utils

  def has_child
    self.subjects.count > 0
  end

  protected
    def set_title_id
      title_tmp_id = self.convert_short_name self.title
      subject = Subject.find_by_title_id title_tmp_id
      if !subject.nil? and subject.id != self.id

        if self.random_uuid.nil?
          self.random_uuid = SecureRandom.uuid
        end
        self.title_id = title_tmp_id + "-" + self.random_uuid.to_s

        subject = Subject.find_by_title_id self.title_id
        if !subject.nil? and subject.id != self.id
          self.random_uuid = SecureRandom.uuid
          self.title_id = title_tmp_id + "-" + self.random_uuid.to_s
        end
      else
        self.title_id = title_tmp_id
      end
    end
end
