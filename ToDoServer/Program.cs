
// using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ToDoDbContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
new MySqlServerVersion(new Version(8, 0, 21))));

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://todoclient-06f4.onrender.com")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});
//swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();
//cors
app.UseCors("AllowSpecificOrigin");

// swagger
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }


//getAllItems
app.MapGet("/", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});
//getById
app.MapGet("/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FirstOrDefaultAsync(x => x.Id == id);
    if (item != null)
        return item;
    return null;
});
//addItem
app.MapPost("/addItem", async (ToDoDbContext db, Item item) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created();
});
// updateItem
app.MapPut("/updateCompleted", async (ToDoDbContext db, Item item) =>
{
    var i = await db.Items.FirstOrDefaultAsync(x => x.Id == item.Id);
    if (i != null)
    {
        i.IsComplete = item.IsComplete;
        await db.SaveChangesAsync();
    }
});
//deleteItem
app.MapDelete("/removeItem", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FirstOrDefaultAsync(x => x.Id == id);
    if (item != null)
    {
        var x = db.Items.Remove(item);
        db.SaveChanges();
    }
});

app.Run();