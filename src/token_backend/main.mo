import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";



actor Token {
  
  let owner: Principal = Principal.fromText("n4ep7-gmkwn-rljvt-klaf5-5pqlc-oc3gq-6egs5-rh4tw-wdcjd-oghbw-yqe");
  let totalSupply: Nat = 10000;
  let symbol: Text = "CANDY";
  
  private stable var balanceEntries:  [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  public query func balanceOf(who: Principal): async Nat {
    
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    
    return balance;
  };

  public query func getSymbol(): async Text {
    return symbol;
  };

  public shared(msg) func payOut(): async Text {
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 100;
      balances.put(msg.caller, amount);  
      return "Success!";
    } else {
      return "Already Claimed!";
    };    
  };

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);
      
      let toBalance = await balanceOf(to);
      let newToBalance: Nat = toBalance + amount;
      balances.put(to, newToBalance);
      return "Success!";
    }else{
      return "Insufficient Balance!";
    };
  };

  system func preupgrade() {
    Debug.print("preupgrade");
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };
};
