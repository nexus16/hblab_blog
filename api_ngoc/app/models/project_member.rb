class ProjectMember < ActiveRecord::Base
	validates  :user_id, presence: true
	validates  :project_id, presence: true
  belongs_to :project
  belongs_to :user
  def project_id_exists?
  	!Project.find_by_id(self.project_id).nil?
  end
  def user_id_exists?
  	!User.find_by_id(self.user_id).nil?
  end
end
