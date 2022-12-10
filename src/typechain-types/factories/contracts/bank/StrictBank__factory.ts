/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { StrictBank, StrictBankInterface } from "../../../contracts/bank/StrictBank";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract RoleStore",
        name: "_roleStore",
        type: "address",
      },
      {
        internalType: "contract DataStore",
        name: "_dataStore",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NativeTokenTransferError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenTransferError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "prevGov",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nextGov",
        type: "address",
      },
    ],
    name: "SetGov",
    type: "event",
  },
  {
    inputs: [],
    name: "dataStore",
    outputs: [
      {
        internalType: "contract DataStore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gov",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "recordTransferIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "recoverNativeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "roleStore",
    outputs: [
      {
        internalType: "contract RoleStore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gov",
        type: "address",
      },
    ],
    name: "setGov",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "transferOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "bool",
        name: "shouldUnwrapNativeToken",
        type: "bool",
      },
    ],
    name: "transferOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516110bf3803806110bf83398101604081905261002f916100d3565b818181818161003d3361005a565b6001600160a01b039081166080521660a0525061010d9350505050565b600080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f53351836099c03ffc3b1727d8abd4b0222afa87d4ed76ae3102d51369ef7f785910160405180910390a15050565b6001600160a01b03811681146100d057600080fd5b50565b600080604083850312156100e657600080fd5b82516100f1816100bb565b6020840151909250610102816100bb565b809150509250929050565b60805160a051610f6a6101556000396000818161017f0152818161029b015281816102de0152818161048001526107f201526000818161011e01526103ba0152610f6a6000f3fe60806040526004361061007a5760003560e01c806312d43a51146100865780632d891fba146100bc578063352f9aed146100de5780634a4a7b041461010c578063523fba7f14610140578063660d0d671461016d5780636bd3d451146101a157806388d44f41146101c1578063cfad57a2146101e157600080fd5b3661008157005b600080fd5b34801561009257600080fd5b506000546100a6906001600160a01b031681565b6040516100b39190610c94565b60405180910390f35b3480156100c857600080fd5b506100dc6100d7366004610cbd565b610201565b005b3480156100ea57600080fd5b506100fe6100f9366004610cff565b610261565b6040519081526020016100b3565b34801561011857600080fd5b506100a67f000000000000000000000000000000000000000000000000000000000000000081565b34801561014c57600080fd5b506100fe61015b366004610cff565b60016020526000908152604090205481565b34801561017957600080fd5b506100a67f000000000000000000000000000000000000000000000000000000000000000081565b3480156101ad57600080fd5b506100dc6101bc366004610d23565b610284565b3480156101cd57600080fd5b506100dc6101dc366004610d5d565b6102c5565b3480156101ed57600080fd5b506100dc6101fc366004610cff565b610349565b61025160405160200161021390610db0565b604051602081830303815290604052805190602001206040518060400160405280600a81526020016921a7a72a2927a62622a960b11b8152506103a3565b61025c838383610453565b505050565b600061027560405160200161021390610db0565b61027e826104b0565b92915050565b61029660405160200161021390610db0565b6102c17f00000000000000000000000000000000000000000000000000000000000000008383610561565b5050565b6102d760405160200161021390610db0565b60006103027f0000000000000000000000000000000000000000000000000000000000000000610718565b9050806001600160a01b0316856001600160a01b03161480156103225750815b15610337576103328585856107c5565b610342565b610342858585610453565b5050505050565b6000546001600160a01b03163314610397576040805163a35b150b60e01b81523360048201526024810191909152600360448201526223a7ab60e91b60648201526084015b60405180910390fd5b6103a081610819565b50565b60405163ac4ab3fb60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ac4ab3fb906103f19033908690600401610dd4565b602060405180830381865afa15801561040e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104329190610ded565b6102c157338160405163a35b150b60e01b815260040161038e929190610e5a565b306001600160a01b0382160361047b5760405162461bcd60e51b815260040161038e90610e7e565b6104a77f000000000000000000000000000000000000000000000000000000000000000084838561087a565b61025c836109b0565b6001600160a01b0381166000818152600160205260408082205490516370a0823160e01b8152919290918391906370a08231906104f1903090600401610c94565b602060405180830381865afa15801561050e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105329190610eae565b6001600160a01b038516600090815260016020526040902081905590506105598282610ec7565b949350505050565b8060000361056e57505050565b6000836001600160a01b031663bd02d0f56040516020016105c0906020808252601f908201527f4e41544956455f544f4b454e5f5452414e534645525f4741535f4c494d495400604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b81526004016105f491815260200190565b602060405180830381865afa158015610611573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106359190610eae565b9050600080846001600160a01b0316848490604051600060405180830381858888f193505050503d8060008114610688576040519150601f19603f3d011682016040523d82523d6000602084013e61068d565b606091505b509150915081156106a057505050505050565b6000816040516020016106b39190610ee8565b60405160208183030381529060405290507f6c4e9d88878940a822d239187b8b00d62a80dce222d53bc5f1fb072d9c34b681816040516106f39190610ee8565b60405180910390a18585604051633828654560e11b815260040161038e929190610dd4565b6000816001600160a01b03166321f8a7216040516020016107509060208082526003908201526215d39560ea1b604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b815260040161078491815260200190565b602060405180830381865afa1580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027e9190610efb565b306001600160a01b038216036107ed5760405162461bcd60e51b815260040161038e90610e7e565b6104a77f0000000000000000000000000000000000000000000000000000000000000000848385610a39565b600080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f53351836099c03ffc3b1727d8abd4b0222afa87d4ed76ae3102d51369ef7f785910160405180910390a15050565b80156109aa576000846001600160a01b031663bd02d0f561089a86610aa4565b6040518263ffffffff1660e01b81526004016108b891815260200190565b602060405180830381865afa1580156108d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f99190610eae565b905060008061090a86868686610b2c565b91509150811561091c575050506109aa565b60008160405160200161092f9190610ee8565b60405160208183030381529060405290507f9db60cdf21cde7f760995e23662841725e6aa63be48799796db12b7b2e6b17e28160405161096f9190610ee8565b60405180910390a160405163012f3b8f60e71b81526001600160a01b038089166004830152871660248201526044810186905260640161038e565b50505050565b6040516370a0823160e01b81526001600160a01b038216906370a08231906109dc903090600401610c94565b602060405180830381865afa1580156109f9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1d9190610eae565b6001600160a01b03909116600090815260016020526040902055565b80156109aa57604051632e1a7d4d60e01b8152600481018290526001600160a01b03841690632e1a7d4d90602401600060405180830381600087803b158015610a8157600080fd5b505af1158015610a95573d6000803e3d6000fd5b505050506109aa848383610561565b6000604051602001610ae2906020808252601890820152771513d2d15397d514905394d1915497d1d054d7d31253525560421b604082015260600190565b60408051601f198184030181528282528051602091820120908301526001600160a01b03841690820152606001604051602081830303815290604052805190602001209050919050565b60006060600063a9059cbb60e01b8686604051602401610b4d929190610dd4565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050600080886001600160a01b03168684604051610b9e9190610f18565b60006040518083038160008787f1925050503d8060008114610bdc576040519150601f19603f3d011682016040523d82523d6000602084013e610be1565b606091505b50915091508115610c82578051600003610c3f576001600160a01b0389163b610c3f5760006040518060400160405280601481526020017310d85b1b081d1bc81b9bdb8b58dbdb9d1c9858dd60621b81525094509450505050610c8b565b60008151118015610c61575080806020019051810190610c5f9190610ded565b155b15610c7457600094509250610c8b915050565b600194509250610c8b915050565b60009450925050505b94509492505050565b6001600160a01b0391909116815260200190565b6001600160a01b03811681146103a057600080fd5b600080600060608486031215610cd257600080fd5b8335610cdd81610ca8565b9250602084013591506040840135610cf481610ca8565b809150509250925092565b600060208284031215610d1157600080fd5b8135610d1c81610ca8565b9392505050565b60008060408385031215610d3657600080fd5b8235610d4181610ca8565b946020939093013593505050565b80151581146103a057600080fd5b60008060008060808587031215610d7357600080fd5b8435610d7e81610ca8565b9350602085013592506040850135610d9581610ca8565b91506060850135610da581610d4f565b939692955090935050565b6020808252600a908201526921a7a72a2927a62622a960b11b604082015260600190565b6001600160a01b03929092168252602082015260400190565b600060208284031215610dff57600080fd5b8151610d1c81610d4f565b60005b83811015610e25578181015183820152602001610e0d565b50506000910152565b60008151808452610e46816020860160208601610e0a565b601f01601f19169290920160200192915050565b6001600160a01b038316815260406020820181905260009061055990830184610e2e565b6020808252601690820152752130b7359d1034b73b30b634b2103932b1b2b4bb32b960511b604082015260600190565b600060208284031215610ec057600080fd5b5051919050565b8181038181111561027e57634e487b7160e01b600052601160045260246000fd5b602081526000610d1c6020830184610e2e565b600060208284031215610f0d57600080fd5b8151610d1c81610ca8565b60008251610f2a818460208701610e0a565b919091019291505056fea26469706673582212205f568b5daea02e7e1442d1bed14a38a1ee38daa2b2f044cc4fd513ada756232a64736f6c63430008100033";

type StrictBankConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: StrictBankConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class StrictBank__factory extends ContractFactory {
  constructor(...args: StrictBankConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _roleStore: PromiseOrValue<string>,
    _dataStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StrictBank> {
    return super.deploy(_roleStore, _dataStore, overrides || {}) as Promise<StrictBank>;
  }
  override getDeployTransaction(
    _roleStore: PromiseOrValue<string>,
    _dataStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_roleStore, _dataStore, overrides || {});
  }
  override attach(address: string): StrictBank {
    return super.attach(address) as StrictBank;
  }
  override connect(signer: Signer): StrictBank__factory {
    return super.connect(signer) as StrictBank__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StrictBankInterface {
    return new utils.Interface(_abi) as StrictBankInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): StrictBank {
    return new Contract(address, _abi, signerOrProvider) as StrictBank;
  }
}
