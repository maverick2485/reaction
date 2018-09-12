import gql from "graphql-tag";

export default gql`
  query cart($accountId: ID!, $shopId: ID!, $itemsAfterCursor: ConnectionCursor) {
    cart: accountCartByAccountId(accountId: $accountId, shopId: $shopId) {
      _id
      createdAt
      shop {
        _id
      }
      updatedAt
      expiresAt
      totalItemQuantity
      checkout {
        summary {
          discountTotal {
            amount
          }
          fulfillmentTotal {
            amount
          }
          itemTotal {
            amount
          }
          taxTotal {
            amount
          }
          total {
            amount
          }
        }
      }
      items(first: 20, after: $itemsAfterCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            _id
            productConfiguration {
              productId
              productVariantId
            }
            addedAt
            attributes {
              label
              value
            }
            createdAt
            isBackorder
            isLowQuantity
            isSoldOut
            imageURLs {
              large
              small
              original
              medium
              thumbnail
            }
            metafields {
              value
              key
            }
            parcel {
              length
              width
              weight
              height
            }
            price {
              amount
              displayAmount
              currency {
                code
              }
            }
            priceWhenAdded {
              amount
              displayAmount
              currency {
                code
              }
            }
            productSlug
            productType
            quantity
            shop {
              _id
            }
            title
            variantTitle
            optionTitle
            updatedAt
            currentQuantity
          }
        }
      }
      account {
        _id
      }
    }
  }
`;