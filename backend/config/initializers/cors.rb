# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow common local frontend dev servers (React/Vite/etc) on 3000 and 3001
    origins 'localhost:3001', 'http://localhost:3001', '127.0.0.1:3001', 'http://127.0.0.1:3001',
            'localhost:3000', 'http://localhost:3000', '127.0.0.1:3000', 'http://127.0.0.1:3000'
    
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: false
  end
end