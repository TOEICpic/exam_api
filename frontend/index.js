const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'
let selectedId = ''
window.onload = async () => {
    const EnterWorkDOM = document.getElementById('EnterWork');
    let htmlData0 = '<input class="form"  type="time" id="time" name="EnterWork">';
    EnterWorkDOM.innerHTML = htmlData0;
    const LeaveWorkDOM = document.getElementById('LeaveWork');
    let htmlData00 = '<input class="form"  type="time" id="time" name="LeaveWork">';
    LeaveWorkDOM.innerHTML = htmlData00;
    const LeaveDateDOM = document.getElementById('LeaveDate');
    let htmlData000 = '<input class="form"  type="date" id="date" name="LeaveDate">';
    LeaveDateDOM.innerHTML = htmlData000;

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id) {
        mode = 'EDIT'
        selectedId = id
      try {
          const response = await axios.get(`${BASE_URL}/users/${id}`)
          const user = response.data
            let NameDOM = document.querySelector('input[name=Name]')
            let AddressDOM = document.querySelector('input[name=Address]')
            let TelDOM = document.querySelector('input[name=Tel]')
            let JobPositionDOM = document.querySelector('input[name=JobPosition]')
            let EnterWorkDOM = document.querySelector('input[name=EnterWork]')
            let LeaveWorkDOM = document.querySelector('input[name=LeaveWork]')
            let QuantityDOM = document.querySelector('input[name=Quantity]')
            let JobDescriptionDOM = document.querySelector('input[name=JobDescription]')
            let LeaveDateDOM = document.querySelector('input[name=LeaveDate]')
            let reasonDOM = document.querySelector('textarea[name=reason]')
            let LeaveTypesDOMs = document.querySelectorAll('input[name=LeaveType]')

            NameDOM.value = user.Name
            AddressDOM.value = user.Address
            TelDOM.value = user.Tel
            JobPositionDOM.value = user.JobPosition
            EnterWorkDOM.value = user.EnterWork
            LeaveWorkDOM.value = user.LeaveWork
            QuantityDOM.value = user.Quantity
            JobDescriptionDOM.value = user.JobDescription
            LeaveTypesDOMs.value = user.LeaveType
            LeaveDateDOM.value = user.LeaveDate
            reasonDOM.value = user.reason
            // ตรวจสอบว่ามี LeaveTypeDOMs หรือไม่ และกำหนด checked ตามค่าใน response
            if (!LeaveTypesDOMs || LeaveTypesDOMs.length === 0) {
                console.error("No elements found with name 'LeaveType'");
                return;
            }
            for (let i = 0; i < LeaveTypesDOMs.length; i++) {
                if (LeaveTypesDOMs[i].value === user.LeaveType) {
                    LeaveTypesDOMs[i].checked = true
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    
}
    const validateData = (userData) => {
      let errors = []
      if (!userData.Name) {
        errors.push('กรุณากรอกชื่อ-นามสกุล')
      }
      if (!userData.Address) {
        errors.push('กรุณากรอกที่อยู่')
      }
      if (!userData.Tel) {
        errors.push('กรุณากรอกเบอรืโทรศัพท์')
      }
      if (!userData.JobPosition) {
        errors.push('กรุณาเลือกตำแหน่งงาน')
      }
      if (!userData.EnterWork) {
        errors.push('กรุณากรอกเวลาเข้างาน')
      }
      if (!userData.LeaveWork) {
        errors.push('กรุณากรอกเวลาออกงาน')
      }
      if (!userData.Quantity) {
        errors.push('กรุณากรอกจำนวน(ชั่วโมง)')
      }
      if (!userData.JobDescription) {
        errors.push('กรุณากรอกระเอียดการทำงาน')
      }
      if (!userData.LeaveType) {
        errors.push('กรุณากรอกประเภทของการลา')
      }
      if (!userData.LeaveDate) {
        errors.push('กรุณากรอกวันที่ลา')
      }
      if (!userData.reason) {
        errors.push('กรุณากรอกเหตุผล')
      }
      return errors
    }
const submitData = async () => { 
    let NameDOM = document.querySelector('input[name=Name]')
    let AddressDOM = document.querySelector('input[name=Address]')
    let TelDOM = document.querySelector('input[name=Tel]')
    let JobPositionDOM = document.querySelector('input[name=JobPosition]')
    let EnterWorkDOM = document.querySelector('input[name=EnterWork]')
    let LeaveWorkDOM = document.querySelector('input[name=LeaveWork]')
    let QuantityDOM = document.querySelector('input[name=Quantity]')
    let JobDescriptionDOM = document.querySelector('input[name=JobDescription]')
    let LeaveDateDOM = document.querySelector('input[name=LeaveDate]') 
    let reasonDOM = document.querySelector('textarea[name=description]')
    let LeaveTypesDOMs = document.querySelector('input[name=LeaveType]') || {}
    let messageDOM = document.querySelector('#message')
    // LeaveDateDOM.value = new Date().toISOString().split('T')[0];
    // EnterWorkDOM.value = new Date().toISOString().split('T')[1].split('.')[0];
    // LeaveWorkDOM.value = new Date().toISOString().split('T')[1].split('.')[0];
    try {
        // let LeaveTypes = ''
        // if (!LeaveTypesDOMs || LeaveTypesDOMs.length === 0) {
        //     console.error("No elements found with name 'LeaveType'");
        //     return;
        // }
        // for (let i = 0; i < LeaveTypesDOMs.length; i++) {
        //     if (LeaveTypesDOMs[i] && LeaveTypesDOMs[i].value) {
        //         LeaveTypes += LeaveTypesDOMs[i].value
        //         if (i != LeaveTypesDOMs.length - 1) {
        //             LeaveTypes += ','
        //         }
        //     }
        //   }
        let userData = {
          Name: NameDOM.value,
          Address: AddressDOM.value,
          Tel: TelDOM.value,
          JobPosition: JobPositionDOM.value,
          EnterWork: EnterWorkDOM.value,
          LeaveWork: LeaveWorkDOM.value,
          Quantity: QuantityDOM.value,
          JobDescription: JobDescriptionDOM.value,
          LeaveDate: LeaveDateDOM.value,
          reason: reasonDOM.value,
          LeaveType: LeaveTypesDOMs.value
      }
      const errors = validateData(userData)
      if (errors.length > 0) {
          throw {
              message: 'กรอกข้อมูลไม่ครบ',
              errors: errors
          }
      }    
          let message = 'บันทึกข้อมูลสำเร็จ!'
          if (mode == 'CREATE') {
              const response = await axios.post(`${BASE_URL}/users`, userData)
              console.log('response', response.data)
          } else {
              const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
              message = 'แก้ไขข้อมูลสำเร็จ!'
              console.log('response', response.data)
          }
          messageDOM.innerText = message
          messageDOM.className = 'message success'
  
    

        
        } catch (error) {
            console.log('error message', error.message)
            console.log('error', error.errors)
            if (error.response) {
                console.log(error.response)
                error.message = error.response.data.message
                error.errors = error.response.data.errors
            }
    
            let htmlData = '<div>'
            htmlData += `<div>${error.message}</div>`
            htmlData += '<ul>'

            if (error.errors && error.errors.length > 0) {
            for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
            }
            }
            htmlData += '</ul>'
            htmlData += '<div>'
        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}