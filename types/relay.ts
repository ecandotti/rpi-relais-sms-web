export interface Relay {
    id: number
    GPIOnumber: number
    state: 'in' | 'out' | 'low' | 'high'
}
