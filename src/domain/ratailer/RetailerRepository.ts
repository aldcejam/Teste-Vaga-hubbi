abstract class RetailerRepository {
    abstract create(name:string): Promise<void>;
}

export { RetailerRepository }