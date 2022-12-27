import { get } from "../../api/fetch";
import { ServiceI } from "./FakeStoreService.utils";

const MAIN_URL = 'https://fakestoreapi.com/';

const FakeStoreService = {
    getProducts: async (): Promise<ServiceI> => {
      try {
        const response = await get(`${MAIN_URL}products`);
        return {
            data: response,
            statusCode: 200,
        };
      } catch (err: any) {
        return {
            data: null,
            statusCode: 500,
            error: err,
        };
      }
    },
    getProductById: async (productId: number): Promise<ServiceI> => {
        try {
          const response = await get(`${MAIN_URL}products/${productId}`);
          const data = [];
          data.push(response);
          return {
              data,
              statusCode: 200,
          };
        } catch (err: any) {
          return {
              data: null,
              statusCode: 500,
              error: err,
          };
        }
      },
};

export default FakeStoreService;