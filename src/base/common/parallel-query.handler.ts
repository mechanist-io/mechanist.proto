export class ParallelQueryHandler {
  private queryHandlers = new Set<
    Promise<{ result: unknown; metadata: string }>
  >();

  constructor(private readonly className: string) {}

  add({
    queryHandler,
    metadata,
  }: {
    queryHandler: Promise<unknown>;
    metadata: string;
  }) {
    const wrapped = queryHandler
      .then(result => ({ result, metadata }))
      .catch(error => {
        throw {
          error,
          metadata,
          className: this.className,
        };
      });

    this.queryHandlers.add(wrapped);
  }

  addMany({
    queryHandlers,
    metadata,
  }: {
    queryHandlers: Promise<unknown>[];
    metadata: string;
  }) {
    queryHandlers.forEach(queryHandler => this.add({ queryHandler, metadata }));
  }

  async execute() {
    const results = await Promise.all(this.queryHandlers);
    this.queryHandlers.clear();
    return results;
  }
}
