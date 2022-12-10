/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { OrderUtils, OrderUtilsInterface } from "../../../contracts/order/OrderUtils";

const _abi = [
  {
    inputs: [],
    name: "EmptyMarket",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minExecutionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionFee",
        type: "uint256",
      },
    ],
    name: "InsufficientExecutionFee",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedOrderType",
    type: "error",
  },
];

const _bytecode =
  "0x61189561003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063e019334e1461003a575b600080fd5b81801561004657600080fd5b5061005a61005536600461126b565b61006c565b60405190815260200160405180910390f35b600080600061007a896104f4565b9050806001600160a01b03168460000151606001516001600160a01b031614806100b957506000846040015160078111156100b7576100b7611467565b145b806100d957506001846040015160078111156100d7576100d7611467565b145b806100f957506002846040015160078111156100f7576100f7611467565b145b80610119575060038460400151600781111561011757610117611467565b145b156101955783516060015160405163352f9aed60e01b81526001600160a01b0389169163352f9aed9161014f919060040161147d565b6020604051808303816000875af115801561016e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101929190611491565b91505b8351606001516001600160a01b038083169116036102245783602001516060015182101561020a5760405162461bcd60e51b815260206004820181905260248201527f4f726465725574696c733a20696e76616c696420657865637574696f6e46656560448201526064015b60405180910390fd5b60208401516060015161021d90836114c0565b91506102f1565b60405163352f9aed60e01b81526000906001600160a01b0389169063352f9aed9061025390859060040161147d565b6020604051808303816000875af1158015610272573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102969190611491565b905084602001516060015181146102ef5760405162461bcd60e51b815260206004820152601d60248201527f4f726465725574696c733a20696e76616c696420776e74416d6f756e740000006044820152606401610201565b505b610303868560000151608001516105a7565b5061030c61105d565b80516001600160a01b03878116909152855151825190821660209182015286518101518351908316604091820152875181015184519084166060918201528851810151855194166080948501528851840151855160a090810191909152838a01805151858801805191909152805186018a9052815190950151855185015280518401518551840152805190920151845186015281519094015183518501525190920151905160c001528501516103c39082906106b6565b60608501516040820151901515602090910152608085015160408083015191151591015260006103f38b836106e7565b905061040e8b8261040985602001516080015190565b610761565b60006104198c6107af565b9050610424836107f2565b60405163e04b68ad60e01b81526001600160a01b038b169063e04b68ad9061045290849087906004016115ae565b600060405180830381600087803b15801561046c57600080fd5b505af1158015610480573d6000803e3d6000fd5b5050604051630145116f60e71b81526001600160a01b038e16925063a288b78091506104b290849087906004016115ae565b600060405180830381600087803b1580156104cc57600080fd5b505af11580156104e0573d6000803e3d6000fd5b50929e9d5050505050505050505050505050565b6000816001600160a01b03166321f8a72160405160200161052c9060208082526003908201526215d39560ea1b604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b815260040161056091815260200190565b602060405180830381865afa15801561057d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a191906116b3565b92915050565b6060600082516001600160401b038111156105c4576105c4611160565b6040519080825280602002602001820160405280156105fd57816020015b6105ea61111b565b8152602001906001900390816105e25790505b50905060005b83518110156106ae576000848281518110610620576106206116d0565b6020026020010151905060016001600160a01b0316816001600160a01b0316148061065457506001600160a01b0381166002145b8061066857506001600160a01b0381166003145b15610673575061069c565b61067d868261080b565b83838151811061068f5761068f6116d0565b6020026020010181905250505b806106a6816116e6565b915050610603565b509392505050565b60408201518160078111156106cd576106cd611467565b908160078111156106e0576106e0611467565b9052505050565b60006106fd6106f883604001515190565b610899565b156107135761070c83836108d2565b90506105a1565b61072761072283604001515190565b6109ff565b156107365761070c8383610a5b565b61074a61074583604001515190565b610b0d565b156107595761070c8383610b30565b6105a1610be2565b600061076d8484610bfb565b9050600061077b3a836116ff565b9050808310156107a857604051635dac504d60e01b81526004810182905260248101849052604401610201565b5050505050565b6000806107bb83610dad565b90506000816040516020016107d291815260200190565b60408051601f198184030181529190528051602090910120949350505050565b6108086107fd610e63565b602083015160e00152565b50565b61081361111b565b6040516330af0bbf60e21b81526000906001600160a01b0385169063c2bc2efc9061084290869060040161147d565b600060405180830381865afa15801561085f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610887919081019061171e565b905061089281610ee9565b9392505050565b600060028260078111156108af576108af611467565b14806105a1575060035b8260078111156108cb576108cb611467565b1492915050565b600080836001600160a01b031663bd02d0f56108ec610f11565b6040518263ffffffff1660e01b815260040161090a91815260200190565b602060405180830381865afa158015610927573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094b9190611491565b905061095c836020015160a0015190565b835160a001515161096d90836116ff565b856001600160a01b031663bd02d0f5610984610f84565b6040518263ffffffff1660e01b81526004016109a291815260200190565b602060405180830381865afa1580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e39190611491565b6109ed919061182a565b6109f7919061182a565b949350505050565b60006004826007811115610a1557610a15611467565b1480610a3257506005826007811115610a3057610a30611467565b145b80610a4e57506006826007811115610a4c57610a4c611467565b145b806105a1575060076108b9565b600080836001600160a01b031663bd02d0f5610a75610f11565b6040518263ffffffff1660e01b8152600401610a9391815260200190565b602060405180830381865afa158015610ab0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad49190611491565b9050610ae5836020015160a0015190565b835160a0015151610af690836116ff565b856001600160a01b031663bd02d0f5610984610fc2565b600080826007811115610b2257610b22611467565b14806105a1575060016108b9565b600080836001600160a01b031663bd02d0f5610b4a610f11565b6040518263ffffffff1660e01b8152600401610b6891815260200190565b602060405180830381865afa158015610b85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba99190611491565b9050610bba836020015160a0015190565b835160a0015151610bcb90836116ff565b856001600160a01b031663bd02d0f5610984611000565b60405163c1c0083160e01b815260040160405180910390fd5b600080836001600160a01b031663bd02d0f5604051602001610c4d906020808252601c908201527b1154d512535055115117d1915157d09054d157d1d054d7d31253525560221b604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b8152600401610c8191815260200190565b602060405180830381865afa158015610c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc29190611491565b90506000846001600160a01b031663bd02d0f5604051602001610d16906020808252601f908201527f455354494d415445445f4645455f4d554c5449504c4945525f464143544f5200604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b8152600401610d4a91815260200190565b602060405180830381865afa158015610d67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8b9190611491565b90506000610d99858361103a565b610da3908461182a565b9695505050505050565b6000816001600160a01b031663340dbab3604051602001610de7906020808252600590820152644e4f4e434560d81b604082015260600190565b60408051601f198184030181529082905280516020909101206001600160e01b031960e084901b1682526004820152600160248201526044016020604051808303816000875af1158015610e3f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a19190611491565b600061a4b1461480610e77575062066eeb46145b15610ee45760646001600160a01b031663a3b1b31d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ebb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edf9190611491565b905090565b504390565b80516001600160a01b0316610808576040516302fde0d760e11b815260040160405180910390fd5b6000604051602001610f4c9060208082526015908201527414d25391d31157d4d5d05417d1d054d7d312535255605a1b604082015260600190565b60408051601f198184030181528282528051602091820120908301520160405160208183030381529060405280519060200120905090565b6000604051602001610f4c90602080825260189082015277125390d4915054d157d3d491115497d1d054d7d31253525560421b604082015260600190565b6000604051602001610f4c90602080825260189082015277111150d4915054d157d3d491115497d1d054d7d31253525560421b604082015260600190565b6000604051602001610f4c9060208082526014908201527314d5d05417d3d491115497d1d054d7d31253525560621b604082015260600190565b600068327cb2734119d3b7a9601e1b61105383856116ff565b610892919061183d565b60408051610140810190915260006080820181815260a0830182905260c0830182905260e083018290526101008301919091526060610120830152819081526020016110e760405180610100016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b8152604080516080810182526000808252602082810182905292820181905260608201529101908152602001606081525090565b6040805160a081018252600080825260208201819052918101829052606080820192909252608081019190915290565b6001600160a01b038116811461080857600080fd5b634e487b7160e01b600052604160045260246000fd5b60405160a081016001600160401b038111828210171561119857611198611160565b60405290565b604051601f8201601f191681016001600160401b03811182821017156111c6576111c6611160565b604052919050565b600060c082840312156111e057600080fd5b60405160c081016001600160401b038111828210171561120257611202611160565b8060405250809150823581526020830135602082015260408301356040820152606083013560608201526080830135608082015260a083013560a08201525092915050565b80356008811061125657600080fd5b919050565b8035801515811461125657600080fd5b60008060008060008060c0878903121561128457600080fd5b61128e873561114b565b863595506020808801356112a18161114b565b955060408801356112b18161114b565b945060608801356112c18161114b565b935060808801356112d18161114b565b925060a08801356001600160401b03808211156112ed57600080fd5b90890190610140828c03121561130257600080fd5b61130a611176565b818335111561131857600080fd5b8235830160a0818e03121561132c57600080fd5b611334611176565b61133e823561114b565b813581528582013561134f8161114b565b8187015260408201356113618161114b565b604082015260608201356113748161114b565b606082015260808201358481111561138b57600080fd5b8083019250508d601f8301126113a057600080fd5b8135848111156113b2576113b2611160565b6113c0878260051b0161119e565b818152878101955060059190911b83018701908f8211156113e057600080fd5b928701925b81841015611408576113f7843561114b565b8335865294870194928701926113e5565b60808301525082525061141d8c8486016111ce565b8482015261142d60e08401611247565b604082015261143f610100840161125b565b6060820152611451610120840161125b565b6080820152809450505050509295509295509295565b634e487b7160e01b600052602160045260246000fd5b6001600160a01b0391909116815260200190565b6000602082840312156114a357600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156105a1576105a16114aa565b600081518084526020808501945080840160005b8381101561150c5781516001600160a01b0316875295820195908201906001016114e7565b509495945050505050565b80516008811061153757634e487b7160e01b600052602160045260246000fd5b82526020818101511515908301526040808201511515908301526060908101511515910152565b60005b83811015611579578181015183820152602001611561565b50506000910152565b6000815180845261159a81602086016020860161155e565b601f01601f19169290920160200192915050565b8281526040602080830182905283516101c08385015280516001600160a01b039081166102008601529181015182166102208501529182015181166102408401526060820151811661026084015260808201511661028083015260a0015160c06102a08301526000906116256102c08401826114d3565b905060208401516116826060850182805182526020810151602083015260408101516040830152606081015160608301526080810151608083015260a081015160a083015260c081015160c083015260e081015160e08301525050565b506040840151611696610160850182611517565b506060840151838203603f19016101e0850152610da38282611582565b6000602082840312156116c557600080fd5b81516108928161114b565b634e487b7160e01b600052603260045260246000fd5b6000600182016116f8576116f86114aa565b5060010190565b6000816000190483118215151615611719576117196114aa565b500290565b6000602080838503121561173157600080fd5b82516001600160401b038082111561174857600080fd5b9084019060a0828703121561175c57600080fd5b611764611176565b825161176f8161114b565b81528284015161177e8161114b565b8185015260408301516117908161114b565b604082015260608301516117a38161114b565b60608201526080830151828111156117ba57600080fd5b80840193505086601f8401126117cf57600080fd5b8251828111156117e1576117e1611160565b6117f3601f8201601f1916860161119e565b9250808352878582860101111561180957600080fd5b6118188186850187870161155e565b50608081019190915295945050505050565b808201808211156105a1576105a16114aa565b60008261185a57634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220d09b4217c878db7cac383c2bf80a157bfb8327b2e1fd4affc8ac537aa7611f3264736f6c63430008100033";

type OrderUtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: OrderUtilsConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class OrderUtils__factory extends ContractFactory {
  constructor(...args: OrderUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<OrderUtils> {
    return super.deploy(overrides || {}) as Promise<OrderUtils>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OrderUtils {
    return super.attach(address) as OrderUtils;
  }
  override connect(signer: Signer): OrderUtils__factory {
    return super.connect(signer) as OrderUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderUtilsInterface {
    return new utils.Interface(_abi) as OrderUtilsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): OrderUtils {
    return new Contract(address, _abi, signerOrProvider) as OrderUtils;
  }
}
