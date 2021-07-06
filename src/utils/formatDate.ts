export const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const dt = new Date(date as string);
    const dateString = String(dt);
    const result = dateString.split(' GMT')[0];
    return result;
}