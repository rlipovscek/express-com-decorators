export interface CreatedRoute{
    type: 'get' | 'post' | 'put' | 'delete';
    path: string;
    func: Function;
}