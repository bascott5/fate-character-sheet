export const dice = (modifier: number) => {
    let container: number[] = []

    for (let i = 0; i < 4; i++) {
        let rng = Math.floor(Math.random() * 6) + 1;
        switch (rng) {
            case 1:
                container.push(-1);

            case 2:
                container.push(-1);

            case 3:
                container.push(0);

            case 4:
                container.push(0);

            case 5:
                container.push(1);

            case 6:
                container.push(1);

            default:
                return [...container];
        }
    }
    return container.reduce((sum, num) => sum + num) + modifier;
}