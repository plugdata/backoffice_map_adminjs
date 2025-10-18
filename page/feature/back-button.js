export const backButton = {
    actionType: 'record',
    icon: 'ArrowLeft',
    component: false,
    showInDrawer: false,
    isAccessible: true,

    handler: async (request, response, context) => {
        const {record} = context
        const {resourceId} = request.params
        console.log(resourceId)
        
        // ✅ สร้าง URL โดยตรงแทนการใช้ ViewHelpers
        const redirectUrl = `/admin/resources/${resourceId}/actions/list`
        
        return {
            record: record.toJSON(),
            redirectUrl: redirectUrl,
            notice: {
                message: 'กลับไปหน้ารายการเรียบร้อยแล้ว',
                type: 'success',
            },
        }
    }
}
