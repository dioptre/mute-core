export class RichOperation<Op> {
  readonly id: number
  readonly clock: number
  readonly operation: Op
  readonly dependencies: Map<number, number>

  constructor(
    id: number,
    clock: number,
    operation: Op,
    dependencies: Map<number, number> = new Map()
  ) {
    this.id = id
    this.clock = clock
    this.operation = operation
    this.dependencies = dependencies
  }

  equals(aOther: RichOperation<Op>): boolean {
    const result = this.id === aOther.id && this.clock === aOther.clock
    let dependenciesResult = true
    this.dependencies.forEach((clock, replicaNumber) => {
      if (
        !aOther.dependencies.has(replicaNumber) ||
        aOther.dependencies.get(replicaNumber) !== clock
      ) {
        dependenciesResult = false
      }
    })

    // FIXME: equals between operations

    return result && dependenciesResult
  }
}
