# install
- install ruby,rails

- update bundle
```
bundle install
```
- Update db
modify config/database.yml

```
rake db:create RAILS_ENV=development
rake db:migrate RAILS_ENV=development
rake db:seed RAILS_ENV=development
```

- run project api

```
rails s -p 3456
```

- API

```
# login
- [POST] /api/auth_token
[param]: {auth:{username: "", password: ""}}
# /api/posts
 - [GET]/api/posts # get all posts
 - [POST]/api/posts # create new posts
 [param]: {post:{title:"","content",[tags,...]}}
 - [GET]/api/posts/:id
 - [DELETE] /api/posts/:id
 - [PUT] /api/posts/:id

 same as posts 
# /api/projects
# /api/users
# /api/tags
# /api/projects
# /api/post_stocks
# /api/notifications

```