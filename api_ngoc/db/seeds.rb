# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
test = ""
User.create(
    id: 1,
    username: "admin",
    email: "hoangducdieu@gmail.com",
    password:"123456",
    password_confirmation:"123456",
    access_token:  BCrypt::Engine.generate_salt,
    role:1
)

10.times do |i|
  User.create!(
      id: i + 2,
      username: "user" + i.to_s,
      email: "usertest"+ i.to_s + "@hblab.vn",
      password:"123456",
      password_confirmation:"123456",
      access_token:  BCrypt::Engine.generate_salt,
      role:2
  )
end
# dummy data of posts
100.times do |i|
  Post.create!(
      id: i + 1,
      title_id: "Blog-hblab-" + i.to_s,
      title: "Blog hblab " + i.to_s,
      content: "Noi luu tru bai viet Hblab " + i.to_s,
      created_by: i%10==0 ? 1 : i%10,
      updated_by: i%5,
      status: 1
  )
end
tags = ["PHP", "Javascript", "Java", "Ruby", "Ruby On Rails", "Nodejs", "Angular", "Python", "ObjectiveC", "Android"]
# dummy data
10.times do |i|
  # create data for tags
  Tag.create!(
      id: i + 1,
      name: tags[i]
  )

  20.times do |j|
    PostTag.create!(
        tag_id: i + 1,
        post_id: Random.rand(99) + 1
    )
  end
  # dummy data for projects
  Project.create!(
      id: i + 1,
      title_id: "Project_" + i.to_s,
      name: "Project " + i.to_s,
      description: "Description for project " + i.to_s,
      created_by: i%10
  )

  ProjectMember.create!(
      user_id: Random.rand(10) + 1,
      project_id: i
  )
end
Subject.delete_all

40.times do |i|
  project_id = Random.rand(9) + 1
  Subject.create!(
      id: i + 1,
      title_id: "Subject_#{i.to_s}_of_Project_#{project_id}",
      title: "Subject #{i.to_s} of Project #{project_id}",
      position: i+1,
      project_id: project_id,
      created_by: 1,
      updated_by: 1
  )
  5.times do |j|
    id = 40+ i * 5 + j + 1
    Subject.create!(
        id: id,
        title_id: "Subject_#{id}_of_Subject_#{i+1}",
        title: "Subject #{id} of Subject #{i+1}",
        position: j + 1,
        subject_id: i,
        created_by: 1,
        updated_by: 1
    )
  end
end