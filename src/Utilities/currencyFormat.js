export const currenyFormat = (number) => {
    return `৳ ${new Intl.NumberFormat("en-IN").format(number)}`
}