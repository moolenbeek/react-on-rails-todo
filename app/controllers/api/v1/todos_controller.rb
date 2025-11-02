module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: [:show, :update, :destroy]

      # GET /api/v1/todos
      def index
        @todos = Todo.all.order(created_at: :desc)
        render json: @todos
      end

      # GET /api/v1/todos/:id
      def show
        render json: @todo
      end

      # POST /api/v1/todos
      def create
        @todo = Todo.new(todo_params)

        if @todo.save
          render json: @todo, status: :created
        else
          render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/todos/:id
      def update
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/todos/:id
      def destroy
        @todo.destroy
        head :no_content
      end

      private

      def set_todo
        @todo = Todo.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Todo not found' }, status: :not_found
      end

      def todo_params
        params.require(:todo).permit(:title, :description, :completed, :category, :due_date)
      end
    end
  end
end