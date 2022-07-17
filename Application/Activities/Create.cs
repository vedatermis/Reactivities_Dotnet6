using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command: IRequest
    {
        public Activity Activity { get; set; }
    }
    
    public class Handler: IRequestHandler<Command>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            await _dataContext.Activities.AddAsync(request.Activity, cancellationToken);
            await _dataContext.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}