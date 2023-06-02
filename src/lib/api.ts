import { GraphQLClient, gql } from "graphql-request";

type RequestArgs = {
  query: string;
  variables?: any;
};

export function request({ query, variables }: RequestArgs) {
  const client = new GraphQLClient("https://mock.shop/api");
  return client.request(query, variables);
}

// get product list
export async function getProducts(): Promise<any> {
  const query = gql`
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    return await request({ query });
  } catch (error) {
    console.log(error);
  }
}

//  get single product
export async function getProduct(slug: string): Promise<any> {
  const query = gql`
    query Page($slug: String!) {
      product(handle: $slug) {
        id
        title
        description
        featuredImage {
          url
        }
        availableForSale
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    return await request({ query, variables: { slug } });
  } catch (error) {
    console.log(error);
  }
}

// create new cart
export async function createCart(
  itemId: string,
  quantity: number
): Promise<any> {
  const mutation = gql`
    mutation createCart($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
        }
      }
    }
  `;

  try {
    return await request({
      query: mutation,
      variables: {
        input: {
          lines: [
            {
              quantity: quantity,
              merchandiseId: itemId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// get cart info
export async function getCart(cartId: string): Promise<any> {
  const query = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                    handle
                    featuredImage {
                      url
                    }
                  }
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    return await request({ query, variables: { cartId } });
  } catch (error) {
    console.log(error);
  }
}

// add item to cart
export async function addToCart(
  cartId: string,
  itemId: string,
  quantity: number
): Promise<any> {
  const mutation = gql`
    mutation updateCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;

  try {
    return await request({
      query: mutation,
      variables: {
        cartId: cartId,
        lines: [
          {
            quantity: quantity,
            merchandiseId: itemId,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// update cart item
export async function updateCart(
  cartId: string,
  lineId: string,
  itemId: string,
  quantity: number
): Promise<any> {
  const mutation = gql`
    mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    return await request({
      query: mutation,
      variables: {
        cartId: cartId,
        lines: [
          {
            id: lineId,
            quantity: quantity,
            merchandiseId: itemId,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCartItem(
  cartId: string,
  lineId: string
): Promise<any> {
  const mutation = gql`
    mutation deleteCartItem($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    return await request({
      query: mutation,
      variables: {
        cartId: cartId,
        lineIds: [lineId],
      },
    });
  } catch (error) {
    console.log(error);
  }
}
