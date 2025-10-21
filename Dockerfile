# Use nginx alpine image for smaller size
FROM nginx:alpine

# Copy the website files to nginx html directory
COPY www/ /usr/share/nginx/html/

# Copy assets directory to nginx html directory
COPY assets/ /usr/share/nginx/html/assets/

# Copy custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]