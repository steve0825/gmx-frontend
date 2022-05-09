import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { encodeReferralCode, setTraderReferralCodeByUser, validateReferralCodeExists } from "../../Api/referrals";
import { getCodeError, REFERRAL_CODE_REGEX } from "./ReferralsHelper";
import { useDebounce } from "../../Helpers";
import { useWeb3React } from "@web3-react/core";

function JoinReferralCode({ setPendingTxns, pendingTxns }) {
  return (
    <div className="referral-card section-center mt-medium">
      <h2 className="title">Enter Referral Code</h2>
      <p className="sub-title">Please input a referral code to benefit from fee discounts.</p>
      <div className="card-action">
        <JoinReferralCodeForm setPendingTxns={setPendingTxns} pendingTxns={pendingTxns} />
      </div>
    </div>
  );
}

export function JoinReferralCodeForm({
  setPendingTxns,
  pendingTxns,
  afterSuccess,
  userReferralCodeString = "",
  type = "join",
}) {
  const { account, library, chainId } = useWeb3React();
  const [referralCode, setReferralCode] = useState("");
  const inputRef = useRef("");
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralCodeExists, setReferralCodeExists] = useState(true);
  const debouncedReferralCode = useDebounce(referralCode, 300);

  function getPrimaryText() {
    const isEdit = type === "edit";
    if (isEdit && debouncedReferralCode === userReferralCodeString) {
      return "Referral Code is same";
    }
    if (isEdit && isSubmitting) {
      return "Updating...";
    }

    if (isSubmitting) {
      return "Adding...";
    }
    if (debouncedReferralCode === "") {
      return "Enter Referral Code";
    }
    if (isValidating) {
      return `Checking code...`;
    }
    if (!referralCodeExists) {
      return `Referral Code does not exist`;
    }

    return isEdit ? "Update" : "Submit";
  }
  function isPrimaryEnabled() {
    if (
      debouncedReferralCode === "" ||
      isSubmitting ||
      isValidating ||
      !referralCodeExists ||
      debouncedReferralCode === userReferralCodeString
    ) {
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    const isEdit = type === "edit";
    event.preventDefault();
    setIsSubmitting(true);
    const referralCodeHex = encodeReferralCode(referralCode);
    try {
      const tx = await setTraderReferralCodeByUser(chainId, referralCodeHex, library, {
        account,
        successMsg: isEdit ? "Referral code updated!" : "Referral code added!",
        failMsg: isEdit ? "Referral code updated failed." : "Adding referral code failed.",
        setPendingTxns,
        pendingTxns,
      });
      if (afterSuccess) {
        afterSuccess();
      }
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        setReferralCode("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsValidating(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function checkReferralCode() {
      if (debouncedReferralCode === "" || !REFERRAL_CODE_REGEX.test(debouncedReferralCode)) {
        setIsValidating(false);
        setReferralCodeExists(false);
        return;
      }

      setIsValidating(true);
      const codeExists = await validateReferralCodeExists(debouncedReferralCode, chainId);
      if (!cancelled) {
        setReferralCodeExists(codeExists);
        setIsValidating(false);
      }
    }
    checkReferralCode();
    return () => {
      cancelled = true;
    };
  }, [debouncedReferralCode, chainId]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        disabled={isSubmitting}
        type="text"
        placeholder="Enter referral code"
        className="text-input mb-sm"
        value={referralCode}
        onChange={({ target }) => {
          const { value } = target;
          setReferralCode(value);
        }}
      />
      <button type="submit" className="App-cta Exchange-swap-button" disabled={!isPrimaryEnabled()}>
        {getPrimaryText()}
      </button>
    </form>
  );
}
export default JoinReferralCode;
