using Microsoft.AspNetCore.SignalR;

namespace GeradorDePDF.Application.Hubs;
public class ProgressHub : Hub
{
    public async Task SendProgress(int progress)
    {
        await Clients.All.SendAsync("ReceiveProgress", progress);
    }
}
