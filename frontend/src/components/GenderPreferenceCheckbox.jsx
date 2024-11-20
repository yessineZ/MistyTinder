import React from 'react'

const GenderPreferenceCheckbox = ({form,setForm}) => {
  return (
    
    <div className="flex flex-row">
        <label className="cursor-pointer label gap-2">
            <span className="label-text">Male</span>
            <input type="checkbox" name='Male' checked={form.genderPreference === "male"}  className="checkbox checkbox-secondary" onChange={(e) => setForm({...form,genderPreference: "male"})} />
        </label>

      <label className="cursor-pointer label gap-2">
        <span className="label-text">Female</span>
        <input type="checkbox" name='Female' checked={form.genderPreference === "female"} className="checkbox checkbox-secondary" onChange={(e) => setForm({...form,genderPreference: "female"})} />
       </label>

         <label className="cursor-pointer label gap-2">
        <span className="label-text">Both</span>
        <input type="checkbox" name='Both' checked={form.genderPreference === "both"} className="checkbox checkbox-secondary" onChange={(e) => setForm({...form,genderPreference : "both" })} />
       </label>
</div>
  )
}

export default GenderPreferenceCheckbox ;