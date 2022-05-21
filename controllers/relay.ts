export const getRelaysState = (req: any, res: any) => {
    return res.json({
        success: true,
        relays: [
            { id: 'A', number: 1, state: true },
            { id: 'B', number: 2, state: true },
            { id: 'C', number: 3, state: false },
            { id: 'D', number: 4, state: false },
            { id: 'E', number: 5, state: true },
            { id: 'F', number: 6, state: true },
        ],
    })
}
