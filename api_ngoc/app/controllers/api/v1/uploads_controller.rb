class Api::V1::UploadsController < ApplicationController
	include Utils
	def index
		p config
		uploaded_io = params[:file]
		accepted_formats = [".png", ".jpeg",".jpg"]
		if uploaded_io != nil && uploaded_io.size < 1000000
			if accepted_formats.include? File.extname uploaded_io.original_filename
				FileUtils.mkdir_p Rails.root.join('public', 'uploads');
				filename = SecureRandom.uuid+uploaded_io.original_filename
				File.open(Rails.root.join('public', 'uploads', filename), 'wb') do |file|
		  		file.write(uploaded_io.read)
				end
				render json: { status: true,generatedName: filename,src:"http://dev.blog.hblab.vn/uploads/"+filename }
			else
				render json: { status: false,message: "file is not image" }
			end
		else
			render json: { status: false,message: "file too large" }
		end
	end
end