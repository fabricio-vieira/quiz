export default function desordenar(elementos: any[]): any[] {
    return elementos
        .map(elem => ({ valor: elem, aleatorio: Math.random() }))
        .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio)
        .map(obj => obj.valor)
}