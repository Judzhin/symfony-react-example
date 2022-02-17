<?php

namespace App\Builder;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JsonResponseBuilder
{
    /**
     * Response Array
     * @var array
     */
    private array $data;

    /**
     * Status Code
     * @var Integer
     */
    private int $status;

    /**
     * Response Headers
     * @var array
     */
    private array $headers;

    /**
     * Error
     * @var array|null
     */
    private ?array $error = null;

    /**
     * @param bool $strictMode if ok, empty meta and data will be null
     */
    public function __construct(private bool $strictMode = true)
    {
        $this->status = Response::HTTP_OK;
        $this->headers = [];
        $this->data = [
            'success' => true,
            'meta' => [],
            'data' => [],
            'message' => null,
        ];
    }

    /**
     * Set Strict Mode
     *
     * @param bool $strictMode key
     * @return JsonResponseBuilder Current Instance
     */
    public function strictMode(bool $strictMode = true): static
    {
        $this->strictMode = $strictMode;
        return $this;
    }

    /**
     * Add Meta
     * @param string $key key
     * @param mixed $value value
     * @return JsonResponseBuilder Current Instance
     */
    public function addMeta(string $key, mixed $value): static
    {
        $this->data['meta'][$key] = $value;
        return $this;
    }

    /**
     * Merge Meta
     * @param array $meta meta array
     * @return JsonResponseBuilder Current Instance
     */
    public function mergeMeta(array $meta): static
    {
        $this->data['meta'] = array_merge($this->data['meta'], $meta);
        return $this;
    }

    /**
     * Add data
     *
     * @param string|array $key
     * @param mixed|null $value
     * @param bool $parseMeta
     * @return $this
     */
    public function addData(string|array $key, mixed $value = null, bool $parseMeta = false): static
    {
        if ($parseMeta) {
            $this->parseMeta($value);
        }

        if (null !== $value) {
            $this->data['data'][$key] = $value;
        } else {
            $this->data['data'] = $key;
        }
        return $this;
    }

    /**
     * Merge Data
     * @param array $data data array
     * @return JsonResponseBuilder Current Instance
     */
    public function mergeData(array $data)
    {
        $this->parseMeta($data);
        $this->data['data'] = array_merge($this->data['data'], $data);
        return $this;
    }

    /**
     * Add Header
     *
     * @param string $key key
     * @param mixed $value value
     * @return JsonResponseBuilder Current Instance
     */
    public function addHeader(string $key, mixed $value)
    {
        $this->headers[$key] = $value;
        return $this;
    }

    /**
     * @param string|array $message
     * @return $this
     */
    protected function setMessage(string|array $message)
    {
        if ($message) {
            $this->data['message'] = $message;
        }

        return $this;
    }

    /**
     * Set Response Status To success
     *
     * @param string|array $message
     * @return $this
     */
    public function success(string|array $message = 'Successfully Retrieved'): static
    {
        $this->setSuccess(true);
        $this->setMessage($message);
        return $this;
    }

    /**
     * Set Response Status To Error
     *
     * @param null $message
     * @param null $errorCode
     * @return $this
     */
    public function error($message = null, $errorCode = null)
    {
        $this->setSuccess(false);

        if (!$this->error) {
            $this->error = [];
        }

        $this->error['code'] = $this->status;
        $this->error['message'] = $message ?: '';

        $this->setMessage($message);

        if ($errorCode) {
            $this->error['code'] = $errorCode;
        }

        return $this;
    }

    /**
     * Add Error To Errors Array
     *
     * @param string $key Key
     * @param mixed $value Value
     * @return JsonResponseBuilder Current Instance
     */
    public function addError($key, $value)
    {
        if (!$this->error) {
            throw new \BadMethodCallException(__METHOD__ . ' you have to call error() method first before start adding errors.');
        }

        $this->error[$key] = $value;
        return $this;
    }

    /**
     * Set Response Status Code
     * @param integer $status_code Status Code
     * @return JsonResponseBuilder Current Instance
     */
    public function setStatus($status_code)
    {
        $this->status = (int)$status_code;
        return $this;
    }

    /**
     * Set Success
     * @param bool $value
     * @return JsonResponseBuilder Current Instance
     */
    protected function setSuccess(bool $value)
    {
        $this->data['success'] = $value;

        if ($value) {
            $this->error = null;
        }

        return $this;
    }

    /**
     * Parse Meta
     * @param  [type] &$data [description]
     * @return [type]        [description]
     */
    protected function parseMeta(&$data)
    {
        if (isset($data['meta'])) {
            $meta = $data['meta'];
            unset($data['meta']);
            $this->mergeMeta($meta);
        }
    }

    /**
     * @param int|null $status
     * @return JsonResponse
     */
    public function build(int $status = null): JsonResponse
    {
        if ($status) {
            $this->setStatus($status);
        }

        if ($this->error) {
            $this->data['error'] = $this->error;
        }

        if ($this->strictMode) {
            if (empty($this->data['meta'])) {
                unset($this->data['meta']);
            }

            if (empty($this->data['data'])) {
                unset($this->data['data']);
            }

            if (empty($this->data['message'])) {
                unset($this->data['message']);
            }
        }

        return new JsonResponse($this->data, $this->status, $this->headers);
    }
}