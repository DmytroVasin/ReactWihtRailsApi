module V1
  class AboutsController < ApplicationController
    def show
      sleep 3

      render json: { about_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, nostrum, nihil, consequuntur, ex ut magni quas fugit corporis illum ab deserunt voluptatum ea officiis enim culpa ipsa error maiores molestiae.' }
    end
  end
end
