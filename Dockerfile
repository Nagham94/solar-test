#select base image --- 1st stage
FROM golang:1.21-alpine AS build
#set working directory
WORKDIR /build
# to download all dependencies specified in the Go module
COPY go.* .
#this will be executed inside the container /build
RUN go mod download
#generate the bin output inside /bulid/bin
COPY . .
RUN go build -o /build/bin
# 2nd stage
#create a lighy wieght image
FROM gcr.io/distroless/base-debian12
#set working directory
WORKDIR /app
COPY --from=build /build/bin /app/bin
EXPOSE 8080
CMD ["/app/bin"]