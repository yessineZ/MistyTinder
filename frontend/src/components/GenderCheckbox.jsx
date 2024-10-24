import React from 'react' ;
const GenderCheckbox = ({form,setForm}) => {
  return (
    <div className="flex flex-row">
        <label className="cursor-pointer label gap-2">
            <span className="label-text">Male</span>
            <input type="checkbox" name='male' checked={form.gender === "male"}  className="checkbox checkbox-secondary" onChange={(e) => setForm({...form,gender : "male"})} />
        </label>

      <label  className="cursor-pointer label gap-2">
        <span className="label-text">Female</span>
        <input type="checkbox" name='female' checked={form.gender === "female"} className="checkbox checkbox-secondary" onChange={(e) => setForm({...form,gender : "female"})} />
      </label>
</div>
  )
}

export default GenderCheckbox ; 