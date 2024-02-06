#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["GeradorDePDF.API/GeradorDePDF.API.csproj", "GeradorDePDF.API/"]
COPY ["GeradorDePDF.Domain/GeradorDePDF.Domain.csproj", "GeradorDePDF.Domain/"]
COPY ["GeradorDePDF.Application/GeradorDePDF.Application.csproj", "GeradorDePDF.Application/"]
COPY ["GeradorDePDF.Infra.IoC/GeradorDePDF.Infra.IoC.csproj", "GeradorDePDF.Infra.IoC/"]
RUN dotnet restore "GeradorDePDF.API/GeradorDePDF.API.csproj"
COPY . .
WORKDIR "./GeradorDePDF.API"
RUN dotnet build "GeradorDePDF.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GeradorDePDF.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GeradorDePDF.API.dll"]