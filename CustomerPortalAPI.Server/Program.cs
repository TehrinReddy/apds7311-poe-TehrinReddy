namespace CustomerPortalAPI.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

           
            builder.Services.AddControllers();

            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("https://localhost:7187;http://localhost:5173") 
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            
            builder.Services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");
            builder.Services.AddHttpsRedirection(options =>
            {
                options.HttpsPort = 7187; 
            });

            https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            
            app.UseCors("AllowFrontend");

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
