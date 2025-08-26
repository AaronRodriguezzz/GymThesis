// TermsModal.jsx
import { useEffect, useState } from "react";
import { postData } from "../../api/apis";
import { expirationData } from "../../data/expirationData";
import { AlertPopup } from '../../components/dialogs/CustomAlert';

export default function TermsModal({
  open,
  title = "Terms & Conditions",
  membershipForm,
  setMembershipForm,
  onClose,
}) {
  const [agreed, setAgreed] = useState(false);
  const [popUp, setPopUp] = useState({
    visible: false,
    type: 'success',
    message: ''
  })

  // Reset checkbox each time the modal opens
  useEffect(() => setAgreed(false), [open]);

  // Lock page scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!agreed) return 

    const today = new Date();
    const thisDay = today.getDate();
    const thisMonth = today.getMonth(); 
    const thisYear = today.getFullYear();
    const addedMonths = expirationData[membershipForm.plan];

    const expirationMonth =  thisMonth + addedMonths;

    console.log(thisDay);

    if(expirationMonth > 12) {
      const extraYears = Math.floor(expirationMonth / 12);
      const newMonth = expirationMonth % 12;
      const newYear = thisYear + extraYears;
      const expiration = new Date(newYear, newMonth, thisDay);
      membershipForm.expirationDate = expiration;
    }else{
      const expiration = new Date(thisYear, thisMonth + addedMonths, thisDay);
      membershipForm.expirationDate = expiration;
    }

    console.log(membershipForm);

    try{    
      const res = await postData('/api/members', membershipForm);

      if(res){
        alert('Membership Form Submitted')
        setPopUp({
          visible: true,
          type: 'success',
          message: res.message || ''
        })
        setMembershipForm({
          fullName: '',
          email: '',
          phone: '',
          selectedPlan: '',
          fitnessGoal: ''
        })
        onClose();

      }
    }catch(err){
      setPopUp({
        visible: true,
        type: 'error',
        message: err?.message || 'Membership Submission Failed'
      })
    }
  }

  if (!open) return null;


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tc-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={(e) => e.key === "Escape" && onClose?.()}
    >
      {/* Backdrop */}
      <button
        aria-label="Close terms"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-gray-900 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 id="tc-title" className="text-xl font-semibold tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Terms content */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-4 space-y-4 text-gray-300 custom-scrollbar">
          <h4 className="text-lg font-semibold text-white">1. Introduction</h4>
          <p>
            By accessing and using this application, you agree to be bound by the
            following Terms and Conditions. Please read them carefully before
            proceeding.
          </p>

          <h4 className="text-lg font-semibold text-white">2. User Responsibilities</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>You must provide accurate and complete information.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>Any misuse of the service may result in suspension or termination.</li>
          </ul>

          <h4 className="text-lg font-semibold text-white">3. Service Limitations</h4>
          <p>
            We strive to provide continuous access to our services but do not
            guarantee uninterrupted or error-free operation. We are not liable
            for delays or issues beyond our control.
          </p>

          <h4 className="text-lg font-semibold text-white">4. Privacy Policy</h4>
          <p>
            Your data will be handled in accordance with our Privacy Policy. By
            using this service, you consent to such processing and guarantee that
            all data provided is accurate.
          </p>

          <h4 className="text-lg font-semibold text-white">5. Changes to Terms</h4>
          <p>
            We reserve the right to modify these Terms & Conditions at any time.
            Continued use of the service constitutes your acceptance of the
            updated terms.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-gray-800"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I have read and agree to the Terms & Conditions.
          </label>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              disabled={!agreed}
              onClick={(e) => handleSubmit(e)}
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                agreed
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-red-500/50 cursor-not-allowed"
              }`}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>

      {popUp && 
        <AlertPopup 
          type={popUp.type} 
          message={popUp.message} 
          open={popUp.visible}
          onClose={() => setPopUp({
            visible: false,
            type: 'success',
            message: ''
          })}
        />
      }
    </div>
  );
}
