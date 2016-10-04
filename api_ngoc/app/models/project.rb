class Project < ActiveRecord::Base

  before_save :set_title_id

  validates :name, :created_by, presence: true
  validates_uniqueness_of :title_id
  has_many :project_members
  has_many :users,through: :project_members
  has_many :leader,-> { where(leader: 1) }, class_name: "ProjectMember", foreign_key: :project_id
  has_many :subjects, ->{order(:position)}
  has_many :posts, through: :subjects
  belongs_to :created_user, foreign_key: :created_by
  belongs_to :updated_user, foreign_key: :updated_by

  include Utils

  protected
    def set_title_id
      title_tmp_id = self.convert_short_name self.name
      project = Project.find_by_title_id title_tmp_id
      if !project.nil? and project.id != self.id

        if self.random_uuid.nil?
          self.random_uuid = SecureRandom.uuid
        end
        self.title_id = title_tmp_id + "-" + self.random_uuid.to_s

        project = Project.find_by_title_id self.title_id
        if !project.nil? and project.id != self.id
          self.random_uuid = SecureRandom.uuid
          self.title_id = title_tmp_id + "-" + self.random_uuid.to_s
        end
      else
        self.title_id = title_tmp_id
      end
    end
end
