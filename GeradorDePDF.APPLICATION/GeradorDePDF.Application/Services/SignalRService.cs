using GeradorDePDF.Application.Hubs;
using GeradorDePDF.Domain.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace GeradorDePDF.Application.Services;
public class SignalRService(IHubContext<ProgressHub> hubContext) : ISignalRService
{
    private readonly IHubContext<ProgressHub> _hubContext = hubContext;

    public async Task StartProgress()
    {
        for (int i = 0; i <= 100; i++)
        {
            await Task.Delay(100);

            await _hubContext.Clients.All.SendAsync("ReceiveProgress", i);
        }
    }
}
