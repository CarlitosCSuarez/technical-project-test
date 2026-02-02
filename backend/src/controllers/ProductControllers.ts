import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [
    { "id": "uno", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "dos", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "tres", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "cuatro", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "cinco", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },

    { "id": "seis", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "siete", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "ocho", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "nueve", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "diez", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },

    { "id": "once", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "doce", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "trece", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "catorce", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "quince", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },

    { "id": "dieciseis", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "diecisiete", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "dieciocho", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "diecinueve", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "veinte", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },

    { "id": "veintiuno", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "veintidos", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "veintitres", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "veinticuatro", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) },
    { "id": "veinticinco", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": new Date(), "date_revision": new Date(((new Date()).setFullYear((new Date()).getFullYear() + 1))) }
  ]

  @Get("")
  getAll() {
    return {
      data: [...this.products],
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate: true }) productItem: ProductDTO) {

    const index = this.findIndex(productItem.id);

    if (index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }

    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }

}
