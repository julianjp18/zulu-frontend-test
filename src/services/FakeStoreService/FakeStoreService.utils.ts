export interface ProductI {
    "id": number;
    "title": string;
    "price": number;
    "description": string;
    "category": string;
    "image": string;
    "rating": {
        "rate": number;
        "count": number;
    }
}

export interface ServiceI {
    data: ProductI[] | null;
    statusCode: number;
    error?: string | null;
}