import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import '../App.css';

const erc721Transfers = gql`
  query TokenTransfers {
    erc721Transfers(
      filter: {
        contractAddresses: ["0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D"]
      }
    ) {
      erc721Transfers {
        token {
          name
          tokenId
        }
        from {
          address
        }
        to {
          address
        }
        transaction {
          value
          blockTimestamp
        }
      }
    }
  }
`;

export default function Home(props) {
  const { dataLoaded, setDataLoaded } = props;

  const { loading, error, data, refetch } = useQuery(erc721Transfers);

  useEffect(() => {
    if (!loading && !error) {
      setDataLoaded(true);
    }
  }, [loading, error]);

  if (!dataLoaded) {
    return 'Loading...'; 
  }

  if (error) {
    return `Error! ${error.message}`; 
  }

  const transfers = data.erc721Transfers.erc721Transfers;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Token Id</th>
            <th>Price</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer, index) => (
            <tr key={index}>
              <td>{transfer.token.name}</td>
              <td>{transfer.token.tokenId}</td>
              <td>{(transfer.transaction.value / 10 ** 18).toFixed(5)} ETH</td>
              <td>{transfer.from.address}</td>
              <td>{transfer.to.address}</td>  
              <td>{transfer.transaction.blockTimestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
