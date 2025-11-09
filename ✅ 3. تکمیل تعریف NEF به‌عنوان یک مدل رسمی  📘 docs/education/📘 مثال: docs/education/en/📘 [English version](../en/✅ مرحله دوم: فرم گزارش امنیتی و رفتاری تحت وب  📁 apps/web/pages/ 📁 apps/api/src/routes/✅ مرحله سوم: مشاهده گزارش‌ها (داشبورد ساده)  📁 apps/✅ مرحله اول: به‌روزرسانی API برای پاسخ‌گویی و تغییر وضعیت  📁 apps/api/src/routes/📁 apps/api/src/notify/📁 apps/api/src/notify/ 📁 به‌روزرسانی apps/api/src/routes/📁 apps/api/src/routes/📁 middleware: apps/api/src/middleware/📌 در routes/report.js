const { requireAdmin } = require('../middleware/auth');

// محافظت از مسیرهای GET و POST مدیریت
router.get('/', requireAdmin, async (req, res) => { ... });
router.post('/:id/reply', requireAdmin, async (req, res) => { ... });
router.post('/:id/status', requireAdmin, async (req, res) => { ... });
router.get('/:id/replies', requireAdmin, async (req, res) => { ... });
