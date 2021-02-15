# Dockerfile for acrygen

# sdk build environment
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .

# testing entrypoint
#ENTRYPOINT [ "dotnet", "AcryGen.dll"]

# deployment entrypoint
CMD ASPNETCORE_URLS=http://*:$PORT dotnet AcryGen.dll